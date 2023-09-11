import { z } from 'zod';

const create = z.object({
  body: z.object({
    studentId: z.string({
      required_error: 'faculty id is required',
    }),
    firstName: z.string({
      required_error: 'firstName id is required',
    }),
    lastName: z.string({
      required_error: 'lastName id is required',
    }),
    middleName: z.string({
      required_error: 'middleName id is required',
    }),
    profileImage: z.string({
      required_error: 'profileImage id is required',
    }),
    email: z.string({
      required_error: 'email id is required',
    }),
    contactNo: z.string({
      required_error: 'contactNo id is required',
    }),
    gender: z.string({
      required_error: 'gender id is required',
    }),
    bloodGroup: z.string({
      required_error: 'bloodGroup id is required',
    }),
    academicDepartmentId: z.string({
      required_error: 'academicDepartmentId id is required',
    }),
    academicSemesterId: z.string({
      required_error: 'academicSemesterId id is required',
    }),
    academicFacultyId: z.string({
      required_error: 'academicFacultyId id is required',
    }),
  }),
});
const update = z.object({
  body: z.object({
    studentId: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    middleName: z.string().optional(),
    profileImage: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
    academicDepartmentId: z.string().optional(),
    academicSemesterId: z.string().optional(),
    academicFacultyId: z.string().optional(),
  }),
});

export const studentValidation = {
  create,
  update,
};
