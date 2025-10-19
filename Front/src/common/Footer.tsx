// import Logo from "/icon/ic_white_logo.svg?url";
// import Download from "/icon/ic_download.svg?url";

export const Footer = () => {
  return (
    <div className="w-full px-35 py-15 bg-[#414948] flex flex-row justify-between items-start">
      <div className="flex flex-row gap-x-10">
        <div className="flex flex-col gap-y-4 items-center"></div>

        <div className="flex flex-col gap-y-6.25 justify-between items-start text-base text-white">
          <div className="flex flex-col">
            {/* {FOOTER_CONST.map((item, idx) => (
              <div key={idx} className="flex flex-row items-baseline gap-x-3">
                <div className="shrink-0">
                  <span className="inline-flex w-10.75 justify-between leading-none fondt-bold">
                    {Array.from(item.title).map((ch, i) => (
                      <span key={i} className="shrink-0">
                        {ch}
                      </span>
                    ))}
                  </span>
                </div>

                <div className="font-normal">{item.content}</div>
              </div> 
            ))} */}
          </div>
          <div className="font-normal">© BYUCKCHON. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
};
