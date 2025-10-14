import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReports, changeStatus } from "../store/adminSlice";

function AdminReportList() {
  const dispatch = useDispatch();
  const { reports, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getReports());
  }, [dispatch]);

  const handleStatusChange = (id, e) => {
    dispatch(changeStatus({ id, status: e.target.value }));
  };

  if (loading) return <p>Loading reports...</p>;

  return (
    <div>
      <h2>📋 All Reports</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Title</th>
            <th>User</th>
            <th>Status</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id}>
              <td>{report.title}</td>
              <td>{report.userId?.name}</td>
              <td>{report.status}</td>
              <td>
                <select
                  value={report.status}
                  onChange={(e) => handleStatusChange(report._id, e)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminReportList;
