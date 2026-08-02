import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { form } from '../styles/formStyles.jsx';

export default function FormEditProfile({ user, editProfile }) {
  const navigate = useNavigate();
  const [localUser, setLocalUser] = useState(user || {});

  if (!user) {
    return <p>Loading...</p>;
  }


  const inputStyle = form.input;
  const labelStyle = form.label;
  const buttonLightStyle = form.buttonLight;
  const buttonDarkStyle = form.buttonDark;

  const handleSubmit = (event) => {
    event.preventDefault();
    editProfile(localUser);
  }

  return (
    <>
      <h1 className='font-[Inter] lg:text-[96px] lg:leading-30 md:text-7xl md:leading-20 text-5xl leading-16 font-bold mt-5 mb-8 tracking-[-2px]'>Edit Profile</h1>
      <div className="form-container max-w-220 mb-15">
        <form className="font-[Inter] text-2xl mb-10 flex flex-col " onSubmit={handleSubmit}>
          <div className="form-group mb-4 flex flex-col gap-2">
            <label className={labelStyle} htmlFor="userName">Username</label>
            <input className={inputStyle} value={localUser?.userName} id="userName" name="userName" onChange={e => setLocalUser({ ...localUser, userName: e.target.value })} placeholder="Enter Username" required />
          </div>
          <div className="form-group mb-4 flex flex-col gap-2">
            <label className={labelStyle} htmlFor="email">Email</label>
            <input className={inputStyle} value={localUser?.email} id="email" name="email" onChange={e => setLocalUser({ ...localUser, email: e.target.value })} placeholder="Enter Email" required />
          </div>
          <div className="form-group mb-4 flex flex-col gap-2">
            <label className={labelStyle} htmlFor="bio">Bio</label>
            <textarea className={`min-h-45 ${inputStyle}`} value={localUser?.bio} id="bio" name="bio" onChange={e => setLocalUser({ ...localUser, bio: e.target.value })} placeholder="Enter Bio" />
          </div>
          <div className="form-group mb-4 flex flex-col gap-2">
            <label className={labelStyle} htmlFor="avatarUrl">Avatar URL</label>
            <input className={inputStyle} value={localUser?.avatarUrl} id="avatarUrl" name="avatarUrl" onChange={e => setLocalUser({ ...localUser, avatarUrl: e.target.value })} placeholder="Enter Avatar URL" />
          </div>
          <div className="form-group mb-4 flex gap-2">
            <button className={`w-full ${buttonDarkStyle}`} type="submit">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className={`min-w-60 ${buttonLightStyle}`}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </>
  );
}