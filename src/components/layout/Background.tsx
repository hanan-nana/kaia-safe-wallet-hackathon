const Background = () => {
  return (
    <div className="absolute inset-0">
      {/* 기본 그라디언트 배경 */}
      <div
        className="absolute z-1 inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(218, 254, 178, 0.2) 0%, rgb(197, 238, 70, 0.3) 20%, rgba(141, 221, 66, 0.5) 100%)",
        }}
      />

      {/* 블러 효과를 위한 원형 오브젝트들 */}
      <div className="absolute z-5 inset-0">
        {/* 좌상단 원형 오브젝트 */}
        <div
          className="absolute -top-8 -left-8 opacity-60"
          style={{
            width: "400px",
            height: "200px",
            clipPath: "polygon(0% 0%, 100% 0%, 0% 100%)",
            background:
              "linear-gradient(135deg, rgb(218, 254, 178) 20%, rgba(141, 221, 66, 0.5) 100%)",
          }}
        />
      </div>
    </div>
  );
};

export default Background;
