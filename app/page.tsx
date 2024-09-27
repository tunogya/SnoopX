'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useSearchParams} from 'next/navigation';
import {Suspense} from 'react';

declare global {
  interface Window {
      Telegram?: any;
  }
}

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const params = searchParams.toString()
  const [state, setState] = useState({
      loginStatus: 0,
      errmsg: "",
      tglogin: {} as any,
      userProfile: {} as any,
      query: params,
      lang: "",
      axiosError: {} as any,
      initData: [] as string[]
  })

  useEffect(() => {
      setState((state: any) => {
          return {
              ...state,
              lang: navigator.language,
          }
      })
  }, [])

  useEffect(() => {
    if (window.Telegram.WebApp.initData) {
        const initDataRaw = decodeURIComponent(window.Telegram.WebApp.initData).split("&")
        setState((state: any) => { return { ...state, initData: initDataRaw } })
        let initData: any = {}
        for (let i in initDataRaw) {
            // initData[initDataRaw[i].split("=")[0]] = initDataRaw[i].split("=")[1]
            switch (initDataRaw[i].split("=")[0]) {
                case 'query_id':
                    initData.query_id = initDataRaw[i].split("=")[1]
                    break
                case 'user':
                    initData.user = initDataRaw[i].split("=")[1]
                    break
                case 'auth_date':
                    initData.auth_date = parseInt(initDataRaw[i].split("=")[1])
                    break
                case 'hash':
                    initData.hash = initDataRaw[i].split("=")[1]
                    break
            }
        }
        setState((state: any) => ({
            ...state,
            tglogin: initData,
            userProfile: JSON.parse(initData.user),
            loginStatus: 1
        }))
    } else {
        setState((state: any) => ({
            ...state,
            loginStatus: -1
        }))
    }
}, []);


  useEffect(() => {
    if (state.loginStatus === 1) {
      router.push('/news');
    }
  }, [router, state.loginStatus]);

  const Greetings = () => state.userProfile.first_name ? <div className="mb-4 text-lg font-bold text-slate-400">
  {`Welcome, ${state.userProfile.first_name}${state.userProfile.last_name ? ` ${state.userProfile.last_name}` : ''}`}
</div> : null

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="bg-telegram-bg">
        <div className="flex items-center justify-start flex-col gap-2 h-[100vh] p-4 text-center">
        {state.loginStatus === -1 && <div>
            <p className="text-lg font-bold text-telegram-text">Error, please open the page within Telegram</p>
        </div>}
        {state.loginStatus === 1 && <div>
            <Greetings />
        </div>}
        <footer className="absolute text-lg font-bold text-telegram-text bottom-1">
            SnoopX
        </footer>
    </div>
</div>
</Suspense>
  );
}