import { Link } from "react-router-dom";
const RepoCard = ({ repo }) => {
  return (
    <Link to={`/repo/${repo.full_name}`}>
      <div className="card">
        <div className="card-content">
          <span className="card-title">{repo.name}</span>
          <p>{repo.description}</p>
          <p>Language: {repo.language || "N/A"}</p>
          <p>Stars: {repo.stargazers_count}</p>
          <p>Forks: {repo.forks_count}</p>
        </div>
      </div>
    </Link>
  );
};

export default RepoCard;
