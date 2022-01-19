export class EmployeeAddModel {
    jobTitle: string;
    deptId: string;
    name: string;
    role: string;
    dateOfBirth: Date;
    address: {
        houseNo: string;
        area: string;
        city: string;
        state: string;
        country: string;
        phone: number;
        email: string;
    };
    password: string;
    allotedLeaves: Number;
}

export class EmployeeUpdateModel {
    name?: string;
    jobTitle?: string;
    dateOfBirth?: string;
    address?: {
        houseNo?: string;
        area?: string;
        city?: string;
        state?: string;
        country?: string;
        phone?: number;
        email?: string;
    };
    password?: string;
    allotedLeaves?: number;
}


