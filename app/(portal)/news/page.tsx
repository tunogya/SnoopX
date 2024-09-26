'use client';

const Page = () => {
  return (
    <div>
      <div className={"sticky top-0 bg-white flex flex-row space-x-2 items-center px-4 h-[50px]"}>
        <div className={"relative w-full rounded-md bg-white overflow-hidden"}>
          <div
            className={"w-full h-8 pl-8 items-center flex text-sm bg-[#F4F5F7] text-[#333333] font-light"}
          >
            Search something...
          </div>
          <div className={"absolute top-0 left-0 h-8 flex items-center px-2 text-[#333333]"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" className="size-4">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
        </div>
        <div className={"flex items-center px-3 h-7 bg-[#FF403A] text-white rounded-md text-[13px]"}>
          POST
        </div>
      </div>
      <div>
        <FeedItem title={"THIS HISTORIC #BITCOIN BUY SIGNAL IS FLASHING NOW!!!"} author={"GuncelKriptoCom"} commentCount={11} />
        <FeedItem title={"THIS HISTORIC #BITCOIN BUY SIGNAL IS FLASHING NOW!!!"} author={"GuncelKriptoCom"} commentCount={11} />
        <FeedItem title={"THIS HISTORIC #BITCOIN BUY SIGNAL IS FLASHING NOW!!!"} author={"GuncelKriptoCom"} commentCount={11} />
        <FeedItem title={"THIS HISTORIC #BITCOIN BUY SIGNAL IS FLASHING NOW!!!"} author={"GuncelKriptoCom"} commentCount={11} />
        <FeedItem title={"THIS HISTORIC #BITCOIN BUY SIGNAL IS FLASHING NOW!!!"} author={"GuncelKriptoCom"} commentCount={11} />
        <FeedItem title={"THIS HISTORIC #BITCOIN BUY SIGNAL IS FLASHING NOW!!!"} author={"GuncelKriptoCom"} commentCount={11} />
        <FeedItem title={"THIS HISTORIC #BITCOIN BUY SIGNAL IS FLASHING NOW!!!"} author={"GuncelKriptoCom"} commentCount={11} />
        <FeedItem title={"THIS HISTORIC #BITCOIN BUY SIGNAL IS FLASHING NOW!!!"} author={"GuncelKriptoCom"} commentCount={11} />
        <FeedItem title={"THIS HISTORIC #BITCOIN BUY SIGNAL IS FLASHING NOW!!!"} author={"GuncelKriptoCom"} commentCount={11} />
      </div>
    </div>
  )
}

const FeedItem = ({ title, author, commentCount }: { title: string; author: string; commentCount: number }) => {
  return (
    <div className={"px-4 py-2"}>
    <div className={"text-[17.64px] leading-[24px] break-words"}>
      {title}
    </div>
    <div className={"flex flex-row space-x-1.5"}>
      <div className={"text-[11px] text-[#999999] font-light"}>
        @{author}
      </div>
      <div className={"text-[11px] text-[#999999] font-light"}>
        {commentCount} comments
      </div>
    </div>
  </div>
  )
}

export default Page