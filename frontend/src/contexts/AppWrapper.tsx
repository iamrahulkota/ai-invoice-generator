import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { load_user_data } from "@/redux/Action/actions";
import { Loader2 } from "lucide-react";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { isAuthenticated, user, user_data } = useSelector(
    (state: any) => state.data,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load user data when authenticated
  useEffect(() => {
    const loadUserData = async () => {
      if (user?.id && isAuthenticated) {
        setIsLoading(true);
        await load_user_data(dispatch, user?.id);
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [dispatch, isAuthenticated, user?.id]);

  useEffect(() => {
    console.log("AppWrapper - isAuthenticated:", isAuthenticated);
    console.log("AppWrapper - user_data:", user_data);
  }, [isAuthenticated, user_data]);

  // Reset state when not authenticated
  useEffect(() => {
    if (isAuthenticated === false) {
      dispatch({ type: "RESET_STATE" });
      dispatch({ type: "IS_AUTHENTICATED", payload: false });
    }
  }, [isAuthenticated, dispatch]);

  if (isLoading && localStorage.getItem('token')) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return children;
}
