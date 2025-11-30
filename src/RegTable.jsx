const RegisterRow = ({ name, register }) => (
  <tr>
    <th>{name}</th>
    <td>{register.mantissa ?? 0}</td>
    <td>{register.degree ?? 0}</td>
    <td>{register.operation}</td>
  </tr>
);

const RegistersTable = ({Registers}) => {
  const rows = [
    { name: 'X', reg: Registers.X },
    { name: 'Y', reg: Registers.Y },
    { name: 'A', reg: Registers.A },
    { name: 'B', reg: Registers.B },
    { name: 'M', reg: Registers.M },
  ];

  return (
    <div className="registers">
      <table>
        <colgroup>
          <col className="register" />
          <col className="mantissa" />
          <col className="degree" />
          <col className="operation" />
        </colgroup>
        <thead>
          <tr>
            <th>Рег.</th>
            <th>Мантисса</th>
            <th>Порядок</th>
            <th>Операция</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ name, reg }) => (
            <RegisterRow key={name} name={name} register={reg} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistersTable;