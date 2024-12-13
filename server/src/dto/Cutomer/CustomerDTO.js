class UserDTO {
    constructor(user, customer) {
        this.id = user._id;
        this.name = user.firstname + " " +user.lastname;
        this.email = user.email;
        this.role = user.role;
        this.image = user.image || null; 
        this.dateOfBirth = user.dateOfBirth;
        this.phone = user.phone;
        this.address = user.address;
        this.status = user.status;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
        this.point = customer ? customer.point : 0; 
    }
}

module.exports = UserDTO;
