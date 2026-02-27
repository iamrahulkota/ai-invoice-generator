import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: any) => state.data);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load user data when authenticated
  // useEffect(() => {
  //   const loadUserData = async () => {
  //     if (user?.id && isAuthenticated) {
  //       setIsLoading(true);
  //       await load_user_data(dispatch, user?.id);
  //       setIsLoading(false);
  //     }
  //   };

  //   loadUserData();
  // }, [dispatch, isAuthenticated]);

  // Reset state when not authenticated
  useEffect(() => {
    if (isAuthenticated === false) {
      dispatch({ type: 'RESET_STATE' });
      dispatch({ type: 'IS_AUTHENTICATED', payload: false });
    }
  }, [isAuthenticated, dispatch]);


  return children;
}
