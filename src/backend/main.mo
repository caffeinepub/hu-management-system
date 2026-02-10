import Set "mo:core/Set";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Result "mo:core/Result";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Inventory Types and Structures
  public type HUType = {
    #crate;
    #shipperBox;
    #pallet;
  };

  public type LocationType = {
    #DC;
    #store;
    #other;
  };

  public type Location = {
    id : Text;
    name : Text;
    locationType : LocationType;
  };

  public type GatePass = {
    gpNumber : Text;
    sourceLocationId : Text;
    destinationLocationId : Text;
    status : { #pending; #confirmed; #completed };
    createdBy : Principal;
    createdDate : Time.Time;
  };

  public type ReceivingConfirmation = {
    gpNumber : Text;
    receivedBy : Principal;
    receivingDate : Time.Time;
    huType : HUType;
    quantity : Nat;
    status : { #pending; #confirmed };
  };

  public type InventoryItem = {
    id : Text;
    huType : HUType;
    locationId : Text;
    status : { #onHand; #inTransit };
  };

  public type StockTake = {
    id : Text;
    locationId : Text;
    status : { #active; #completed; #approved };
  };

  public type ExceptionRecord = {
    id : Text;
    locationId : Text;
  };

  public type AppRole = {
    #DEO; // Data Entry Operator - creates gate passes
    #Receiver; // Receives goods at destination
    #Security; // DC main gate security
    #InventoryController; // Manages stock takes and reconciliation
    #LossPreventionOfficer; // LP - views exceptions and shrinkage
    #Operations; // Operations team - views inventory and reports
    #Auditor; // Views audit trails and all reports
  };

  public type UserProfile = {
    name : Text;
    appRoles : [AppRole];
    assignedLocationIds : [Text]; // Locations user can access
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  private func hasAppRole(caller : Principal, requiredRole : AppRole) : Bool {
    switch (userProfiles.get(caller)) {
      case null { false };
      case (?profile) {
        profile.appRoles.find<AppRole>(func(role) { role == requiredRole }) != null
      };
    };
  };

  private func hasLocationAccess(caller : Principal, locationId : Text) : Bool {
    switch (userProfiles.get(caller)) {
      case null { false };
      case (?profile) {
        profile.assignedLocationIds.find<Text>(func(id) { id == locationId }) != null
      };
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile or must be admin");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Admin function to assign app roles and locations to users
  public shared ({ caller }) func assignUserProfile(user : Principal, profile : UserProfile) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can assign user profiles");
    };
    userProfiles.add(user, profile);
  };
};
