// import Logo from "/icon/ic_white_logo.svg?url";
// import Download from "/icon/ic_download.svg?url";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="w-full px-35 py-15 bg-[#414948] flex flex-row justify-between items-start">
      <div className="flex flex-row gap-x-10">
        <div className="flex flex-col gap-y-4 items-center">
          {/* <img src={Logo} alt={"Logo"} className="min-w-56.5 py-4" /> */}
          <div className="flex flex-row items-center justify-center gap-x-3 bg-[#2C3634] px-10 py-2 cursor-pointer">
            <a
              href="/벽촌_회사소개서.pdf"
              className="text-white text-sm font-bold"
              download
            >
              회사소개서 다운로드
            </a>
            {/* <img src={Download} alt={"Download"} /> */}
          </div>
        </div>

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

      <Link to="/privacy">
        <div className="text-[#aaa] text-base font-bold cursor-pointer">
          개인정보처리방침
        </div>
      </Link>
    </div>
  );
};
