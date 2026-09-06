import { getCurrentUser } from '../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ ok:false, error:'METHOD_NOT_ALLOWED' });
  try {
    const user = await getCurrentUser(req);
    if (!user) return res.status(200).json({ ok:true, authenticated:false, user:null });
    return res.status(200).json({ ok:true, authenticated:true, user:{
      id:user.id,
      email:user.email,
      studentName:user.student_name,
      nickname:user.nickname,
      school:user.school,
      city:user.city,
      grade:user.grade,
      guardianEmail:user.guardian_email,
      track:user.track,
      membershipPlan:user.membership_plan,
      membershipStatus:user.membership_status,
      startsAt:user.starts_at,
      expiresAt:user.expires_at
    }});
  } catch (err) {
    console.error('me error', err);
    return res.status(500).json({ ok:false, error:'MEMBER_STATUS_FAILED' });
  }
}
