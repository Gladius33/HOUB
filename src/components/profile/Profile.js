import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const Profile = () => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    avatar: '',
    shortDescription: '',
    detailedDescription: '',
    education: [],
    experience: [],
    dailyRateMin: '',
    dailyRateMax: '',
    maxDuration: '',
    minDuration: '',
    fullTime: false,
    partTime: false,
    remote: false,
    onsite: false,
    geoZone: '',
    paymentInfo: {
      bankAccount: '',
      btcWallet: '',
      xmrWallet: ''
    }
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get('/api/auth/profile');
      setProfile(res.data);
    };

    fetchProfile();
  }, []);

  const onChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('/api/auth/profile', profile);
      setProfile(res.data);
      toast.success(t('profileUpdated'));
    } catch (err) {
      toast.error(t('errorUpdatingProfile'));
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>{t('editProfile')}</h1>
      <div>
        <label>{t('name')}</label>
        <input type="text" name="name" value={profile.name} onChange={onChange} required />
      </div>
      <div>
        <label>{t('email')}</label>
        <input type="email" name="email" value={profile.email} onChange={onChange} required />
      </div>
      <div>
        <label>{t('avatar')}</label>
        <input type="text" name="avatar" value={profile.avatar} onChange={onChange} />
      </div>
      <div>
        <label>{t('shortDescription')}</label>
        <textarea name="shortDescription" value={profile.shortDescription} onChange={onChange} />
      </div>
      <div>
        <label>{t('detailedDescription')}</label>
        <textarea name="detailedDescription" value={profile.detailedDescription} onChange={onChange} />
      </div>
      <div>
        <label>{t('education')}</label>
        {/* Education fields here */}
      </div>
      <div>
        <label>{t('experience')}</label>
        {/* Experience fields here */}
      </div>
      <div>
        <label>{t('dailyRateMin')}</label>
        <input type="number" name="dailyRateMin" value={profile.dailyRateMin} onChange={onChange} />
      </div>
      <div>
        <label>{t('dailyRateMax')}</label>
        <input type="number" name="dailyRateMax" value={profile.dailyRateMax} onChange={onChange} />
      </div>
      <div>
        <label>{t('maxDuration')}</label>
        <input type="number" name="maxDuration" value={profile.maxDuration} onChange={onChange} />
      </div>
      <div>
        <label>{t('minDuration')}</label>
        <input type="number" name="minDuration" value={profile.minDuration} onChange={onChange} />
      </div>
      <div>
        <label>{t('fullTime')}</label>
        <input type="checkbox" name="fullTime" checked={profile.fullTime} onChange={() => setProfile({ ...profile, fullTime: !profile.fullTime })} />
      </div>
      <div>
        <label>{t('partTime')}</label>
        <input type="checkbox" name="partTime" checked={profile.partTime} onChange={() => setProfile({ ...profile, partTime: !profile.partTime })} />
      </div>
      <div>
        <label>{t('remote')}</label>
        <input type="checkbox" name="remote" checked={profile.remote} onChange={() => setProfile({ ...profile, remote: !profile.remote })} />
      </div>
      <div>
        <label>{t('onsite')}</label>
        <input type="checkbox" name="onsite" checked={profile.onsite} onChange={() => setProfile({ ...profile, onsite: !profile.onsite })} />
      </div>
      <div>
        <label>{t('geoZone')}</label>
        <input type="text" name="geoZone" value={profile.geoZone} onChange={onChange} />
      </div>
      <div>
        <label>{t('bankAccount')}</label>
        <input type="text" name="paymentInfo.bankAccount" value={profile.paymentInfo.bankAccount} onChange={onChange} />
      </div>
      <div>
        <label>{t('btcWallet')}</label>
        <input type="text" name="paymentInfo.btcWallet" value={profile.paymentInfo.btcWallet} onChange={onChange} />
      </div>
      <div>
        <label>{t('xmrWallet')}</label>
        <input type="text" name="paymentInfo.xmrWallet" value={profile.paymentInfo.xmrWallet} onChange={onChange} />
      </div>
      <button type="submit">{t('save')}</button>
    </form>
  );
};

export default Profile;
