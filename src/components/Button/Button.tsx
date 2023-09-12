'use client';

export const Button = (): JSX.Element => {
  return (
    <button
      className="p-0"
      onClick={() => {
        console.log('hello');
      }}
      type="button"
    >
      hello
    </button>
  );
};
