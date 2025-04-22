import { UserException } from "../exceptions/UserException";
import type { IEmergencyContact } from "../models/entity/emergency_contact/IEmergencyContact";
import type { EmergencyContactRepository } from "../repositories/emergency_contact/emergencyContactRepository";
import type { UserRepository } from "../repositories/user/UserRepository";
import validator from 'validator';

export class EmergencyContactService {
    private emergencyContactRepository: EmergencyContactRepository;
    private userRepository: UserRepository;

    constructor(emergencyContactRepository: EmergencyContactRepository, userRepository: UserRepository) {
        this.emergencyContactRepository = emergencyContactRepository;
        this.userRepository = userRepository;
    }

    async createEmergencyContact(user_tenant_id: string, first_name: string, last_name: string, email: string, phone: string) {
        if (!user_tenant_id)
            throw new UserException("Requested Tenant User ID is required", 400);

        const user = await this.userRepository.findOne({ where: { id: user_tenant_id } });

        if (!user)
            throw new UserException("Request Tenant User ID is not found", 400);

        if (!first_name)
            throw new UserException("Invalid First Name", 400);

        if (first_name.length < 2)
            throw new UserException("Invalid First Name - it is too short");

        if (!last_name)
            throw new UserException("Invalid Last Name", 400);

        if (last_name.length < 2)
            throw new UserException("Invalid Last Name - it is too short");

        if (!email)
            throw new UserException("Invalid Email Address", 400);

        if (email.length > 254) { // Límite máximo según RFC 5321
            throw new UserException("Email Address is too long", 400);
        }

        if (!validator.isEmail(email))
            throw new UserException("Invalid Format Email Address", 400);

        if (!phone)
            throw new UserException("Invalid Phone Number", 400);

        if (phone.length > 20) { // Límite razonable para números de teléfono
            throw new UserException("Phone Number is too long", 400);
        }

        const isPhoneValid = /^\+?\d{7,15}$/.test(phone);
        if (!isPhoneValid)
            throw new UserException("Invalid Format Phone Number", 400);

        // Crear el contacto de emergencia en forma de entidad
        const request: Partial<IEmergencyContact> = {
            userTenantID: user_tenant_id,
            firstName: first_name,
            lastName: last_name,
            email: email,
            phone: phone
        };

        // Pasar la entidad al repositorio
        const res = await this.emergencyContactRepository.save(request);

        return res;
    }

    async getEmergencyContactById(id: string): Promise<IEmergencyContact> {
        if (!id)
            throw new UserException("Emergency Contact ID is required", 400);

        const res = await this.emergencyContactRepository.findOne({
            where: {
                id: id
            }
        });

        if (!res)
            throw new UserException("Emergency Contact not found", 400);

        return res;
    }

    async getEmergencyContactsByUserId(id: string): Promise<IEmergencyContact[]> {
        if (!id)
            throw new UserException("Tenant User ID is required", 400);

        return this.emergencyContactRepository.find({
            where: {
                id: id
            }
        });
    }
}