import {useEffect, useReducer} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import AppRoot from '../utilities/AppRoot'
import {forceRender, setAppRoot} from '../store/Store'

interface IRootState {
  app: Client
}

type Client = {
  root: AppRoot
}

const useAppRoot = () => {
  const dispatch = useDispatch()
  const {root} = useSelector<IRootState, Client>((state) => state.app)
  // const [, forceRender] = useReducer((boolean) => !boolean, false)

  const _setAppRoot = async (appRoot: AppRoot) => {
    console.log("_setAppRoot", appRoot)
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