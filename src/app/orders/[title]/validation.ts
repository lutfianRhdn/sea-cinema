const validate = (values: any) => {
  const errors: any = {};
  if (!values.time) {
    errors.message = 'tolong pilih jam tayang';
  }
  if (!values.seats) {
    errors.message = 'tolong pilih kursi';
  }
  if (values.seats.length > 6) {
    errors.message = 'maksimal 6 kursi';
  }
  return errors;
};

export default validate;
