const ProfileCard = ({ user }) => {
  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title">GitHub Profile</span>
        <div id="profile" className="center-align">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="circle responsive-img"
          />
          <h4>{user.name}</h4>
          <p>{user.bio}</p>
          <p>Followers: {user.followers}</p>
          <p>Following: {user.following}</p>
          <p>Public Repos: {user.public_repos}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
