function LightBox({isOn}) {
    return (
    <div
        className="box"
        style={{
          backgroundColor: isOn ? 'green' : 'black',
          transition: '0.3s ease',
          width: '300px',
          height: '300px',
          boxShadow: isOn ? '0px 0px 50px green' : 'none',
          margin: '25px',
          display: 'inline-block',
        }}
      />
  );
}

export default LightBox