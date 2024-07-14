const Dashboard = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      Swal.fire({
        title: "Error",
        text: "User Logged Out",
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => navigate("/"));
    }
  });

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2 className="text-gray-500">Create and start your Ai Mockup</h2>

      <div></div>
    </div>
  );
};

export default Dashboard;
