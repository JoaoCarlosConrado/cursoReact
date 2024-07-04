import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

import Button from "../../../../components/Button";
import "./styles.css";

function Schedule({ schedules, onDelete }) {
  const navigate = useNavigate();

  return (
    <ul className="schedules-container">
      {schedules.map((schedule) => {

        return (
          <li key={schedule._id}>
            <div className="schedules-item-head">
              {!schedule.oldScheduling ? (
                <Link to={`/edit-schedule/${schedule._id}`}>
                  {schedule.identifier}
                </Link>
              ) : (
                <span className="identifier">{schedule.identifier}</span>
              )}

              <div>
                {!schedule.oldScheduling && (
                  <Button
                    onClick={() => navigate(`/edit-schedule/${schedule._id}`)}
                  >
                    <Pencil size={16} />
                  </Button>
                )}

                <Button onClick={() => onDelete(schedule._id)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>

            <div className="schedules-item-body">
              <span>
                Professor: <span>{schedule.teacher.name}</span>
              </span>

              <span>{schedule.subject}</span>

              <span>{schedule.description}</span>
            </div>

            <span className="schedules-item-date">
              {new Date(schedule.date)
                .toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
                .replace("", "• ")
                .replace(",", "")}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default Schedule;