import { RootState } from '../../app/store';
import { useSelector } from './../../../node_modules/react-redux/dist/react-redux.d';

export const useAppSelector = useSelector.withTypes<RootState>();
