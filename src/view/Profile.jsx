export default function Profile({ user }) {
  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h2 className='lg:text-4xl text-2xl mb-8 font-medium'>Profile</h2>
      <p>Name: {user.userName}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
