import React from 'react'
import { useState } from 'react';
import ReactsHolder from "@/components/ReactsHolder";
import Image from "next/image";

import { MdOutlineAddReaction } from "react-icons/md";

function Comment({data}) {
  const [seeReplays, setSeeReplays] = useState(false)
  const [reactsHolder, setReactsHolder] = useState(false);

  return (
    <div key={data?.id} className='comment'> 
    <div className='image-holder'>
      <Image src={data?.image || '/users/default.png'} alt="Comment Image" width={40} height={40} unoptimized  />
      <span></span>
    </div>
    <div className='content'>
      <div className='holder'>
        <div className='top'>
          <div className='left'>
            <h5>{data?.name}</h5>
            <span>{data?.time}</span>
          </div>
          {data?.reacts?.count !== 0 && (
            <div className='right emojesCounter'>
              {data?.reacts?.topUseage.map(x => <p>{x}</p>)}
              <p>{data?.reacts?.count}</p>
            </div>
          )}
        </div>
        <p>{data?.paragraph}</p>
        {data?.img && <Image src={data?.img} alt={'comment image'} fill/>}
        <div className='bottom'>
          <div className='left'>
            {data?.replays && Array.isArray(data?.replays) && data?.replays.length > 0 && (
              <button onClick={()=> setSeeReplays(prev => !prev)}>{seeReplays ? 'hide Replays' : `See ${data?.replays.length} Replays`}</button>
            )}
          </div>
          <div className='right'>
            <div>
              <MdOutlineAddReaction onClick={()=> setReactsHolder(prev => !prev)}/>
              {reactsHolder && <ReactsHolder reactsHolder={reactsHolder} setReactsHolder={setReactsHolder} id={data?.id}/>}
            </div>
            <button>Reply</button>
          </div>

        </div>
      </div>

      {seeReplays && (
        data?.replays.map((replay) => (
          <Comment key={replay.id} data={replay}/>
        ))
      )}
    </div>
  </div>
  )
}

export default Comment