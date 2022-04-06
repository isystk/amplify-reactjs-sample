import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AppRoot from '@/utilities/AppRoot'
import { forceRender, setAppRoot } from '.'

interface IRootState {
  app: App
}

type App = {
  root: AppRoot
}

const useAppRoot = () => {
  const dispatch = useDispatch()
  const { root } = useSelector<IRootState, App>((state) => state.app)
  // const [, forceRender] = useReducer((boolean) => !boolean, false)

  const _setAppRoot = async (appRoot: AppRoot) => {
    await dispatch(setAppRoot(appRoot))
    // forceRender()
    await dispatch(forceRender())
  }

  useEffect(() => {
    const init = async () => {
      const _appRoot = new AppRoot(_setAppRoot)
      await _appRoot.setAppRoot()
    }
    if (!root) {
      init()
    }
  }, [])

  return root
}

export default useAppRoot
