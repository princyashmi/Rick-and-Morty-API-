import React, { useState, useEffect } from 'react';
import InfiniteScroll from './InfinitScroll';
const DataList = () => {
  const [data, setData] = useState<any>([]);
  const [pageInfo, setPageInfo] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const fetchData = (page:number) => {
    console.log("DATA TYPE",page,hasMore);
    //  if (hasMore || pageInfo >= page) {
          fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
              .then((res) => res.json())
              .then((res) => {
                  console.log(res)
                  const { info, results } = res;
                  setHasMore(false);
                  setData([...data, ...results]);
                //   if (Number(page) === Number(info?.pages)) {
                //     console.log('inside if',info.pages,page)
                //     setPageInfo(info.pages);
                //     setHasMore(false);
                //     setData([...data, ...results]);
                //   } else {
                //     setData([...data, ...results]);
                //   }
             
              });
      //}
  };
  const renderData = () => {
    console.log('***********************88',data.length)
    return data.map((item:any) => (
      <div key={item.id}>{item.name}</div>
    ));
  };
  return (
    <InfiniteScroll
      fetchData={fetchData}
      totalPage={pageInfo}
      renderData={renderData}
      hasMore={hasMore}
    />
  );
};
export default DataList;