import { z } from 'zod';

const create = z.object({
  body: z.object({
    facultyId: z.string({
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
    designation: z.string({
      required_error: 'designation id is required',
    }),
    bloodGroup: z.string({
      required_error: 'bloodGroup id is required',
    }),
  }),
});

export const FacultyValidation = {
  create,
};
