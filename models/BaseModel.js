class BaseModel {
  constructor( data = {} ) {
    this.programCreate = data.program_create;
    this.programUpdate = data.program_update;
    this.userCreate = data.user_create;
    this.userUpdate = data.user_update;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}
export default BaseModel;