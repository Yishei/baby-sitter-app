const UserInfoDiv = ({ info, value }) => {
  return (
    <div className="User-Info-Div">
      <b style={{ color: "#1677ff", fontSize: "16px" }}>{info}:</b> {value}
    </div>
  );
};

export default UserInfoDiv;
