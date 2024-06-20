import React from "react";

interface ReadmissionValue {
  date: string;
  readmissionLikelihood: number;
}

interface ReadmissionValueProps {
  data: ReadmissionValue[];
  isDarkMode: boolean;
}

const ReadmissionComponent: React.FC<ReadmissionValueProps> = ({ data, isDarkMode }) => {
  const getColorClass = (isDarkMode: boolean): string => {
    return isDarkMode ? "bg-blue-950 text-white" : "bg-blue-200 text-black";
  };

  const getBorderColorClass = (isDarkMode: boolean): string => {
    return isDarkMode ? "border-blue-950" : "border-blue-200";
  };

  const getBackgroundColor = (rate: number) => {
    if (rate > 11) {
      console.log("High readmission rate", rate);
      return "bg-red-600"; // Red background for high readmission rate
    } else if (rate > 6) {
      console.log("Medium readmission rate", rate);
      return "bg-yellow-500"; // Yellow background for medium readmission rate
    } else {
      console.log("Low readmission rate", rate);
      return "bg-green-600"; // Green background for low readmission rate
    }
  };

  return (
    <div className={`pl-5 ${getColorClass(isDarkMode)}`}>
      <p className="font-sans font-normal text-xl">Readmission Likelihood</p>
      <table>
        <tbody className="font-sans sans-serif">
          {data.map((item, index) => (
            <tr
              key={index}
              className={`${
                index === 0 ? `text-5xl h-16 font-bold indent-3 border-b-8 ${getBorderColorClass(isDarkMode)}` : `indent-3 text-2xl font-bold border-b-8 ${getBorderColorClass(isDarkMode)}`
              } ${getBackgroundColor(item.readmissionLikelihood)}`}
            >
              <td>{item.readmissionLikelihood}</td>
              <td className="px-14 pt-2 text-xs">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadmissionComponent;
