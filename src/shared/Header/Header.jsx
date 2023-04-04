import { PreviousButton } from "../../components/Parts/PreviousButton";
import { MoreButton } from "../../components/Parts/MoreButton";
import { SearchLink } from "../../components/Parts/SearchLink";

export const Header = ({ headerFor, title, onModalInfo, isActive, btnText, onSubmitForm, search, setSearch }) => {
  const state = headerFor;
  return (
    <header
      className={`flex justify-between items-center ${
        state === "basic" ? "pl-[1.6rem] pr-[1.2rem]" : "px-[1.6rem]"
      } border-b-cst-ligth-gray border-b-[0.1rem]`}
    >
      {
        {
          basic: (
            <>
              <PreviousButton />
              <MoreButton onModalInfo={onModalInfo} />
            </>
          ),
          chat: (
            <>
              <PreviousButton />
              <span className="ml-[1rem] mr-auto text-[1.4rem]">안녕하세요. 환영합니다.</span>
              <MoreButton onModalInfo={onModalInfo} />
            </>
          ),
          feed: (
            <>
              <span className="text-[1.8rem] font-medium">애니멀톡 피드</span>
              <SearchLink />
            </>
          ),
          follow: (
            <>
              <PreviousButton />
              <span className="ml-[1rem] mr-auto text-[1.4rem] py-[1.5rem]">{title}</span>
            </>
          ),
          save: (
            <>
              <PreviousButton />
              <form onClick={onSubmitForm}>
                <button
                  className={`btn-md text-[1.4rem] text-[#fff] my-[0.8rem] ${isActive ? "bg-m-color" : "bg-s-color"}`}
                  disabled={!isActive}
                >
                  {btnText}
                </button>
              </form>
            </>
          ),
          search: (
            <>
              <PreviousButton />
              <form action="" className="py-[0.8rem]" onSubmit={(e) => e.preventDefault()}>
                <fieldset>
                  <legend className="ir">검색창</legend>
                  <label htmlFor="search"></label>
                  <input
                    id="search"
                    type="text"
                    className="w-[31.6rem] bg-[#F2F2F2] rounded-[32px] px-[1.6rem] py-[0.7rem] text-[1.4rem] outline-none"
                    placeholder="계정 검색"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </fieldset>
              </form>
            </>
          ),
        }[state]
      }
    </header>
  );
};
