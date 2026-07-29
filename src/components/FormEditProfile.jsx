import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function FormEditProfile({ user, editProfile }) {
  const navigate = useNavigate();
  const [localUser, setLocalUser] = useState({ ...user });

  const inputStyle = "py-3 px-4 text-base font-[inherit] text-[#101828] bg-white border border-[#D0D5DD] rounded-lg focus:outline-none focus:border focus:border-[#4C1D95] focus:ring-4 focus:ring-[#4C1D951a]";
  const labelStyle = "text-sm text-[#344054] font-semibold";
  const buttonDarkStyle = "py-3 px-4 bg-[#4C1D95] text-white rounded-lg text-sm font-semibold hover:bg-[#3B0764] cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#4C1D95]/20 transition-colors";
  const buttonLightStyle = "px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors";

  return (
    <>
      <h1 className='font-[Inter] lg:text-[96px] lg:leading-30 md:text-7xl md:leading-20 text-5xl leading-16 font-bold mt-5 mb-8 tracking-[-2px]'>Edit Profile</h1>
      <div className="form-container max-w-220 mb-15">
        <form className="font-[Inter] text-2xl mb-10 flex flex-col ">
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
            <textarea className={`min-h-[180px] ${inputStyle}`} value={localUser?.bio} id="bio" name="bio" onChange={e => setLocalUser({ ...localUser, bio: e.target.value })} placeholder="Enter Bio" />
          </div>
          <div className="form-group mb-4 flex flex-col gap-2">
            <label className={labelStyle} htmlFor="avatarUrl">Avatar URL</label>
            <input className={inputStyle} value={localUser?.avatarUrl} id="avatarUrl" name="avatarUrl" onChange={e => setLocalUser({ ...localUser, avatarUrl: e.target.value })} placeholder="Enter Avatar URL" />
          </div>
          <div className="form-group mb-4 flex gap-2">
            <button className={`w-full ${buttonDarkStyle}`} onClick={() => editProfile(localUser)}>
              Save Changes
            </button>
            <button
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