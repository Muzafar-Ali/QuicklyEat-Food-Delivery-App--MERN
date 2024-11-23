import config from "@/config/config";
import { useEffect, useState } from "react";

export const useMenus = () => {
  const [Menus, setMenus] = useState<string[]>([]);
  const [loadingMenus, setLoadingMenus] = useState<boolean>(false);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoadingMenus(true);
        const response = await fetch(`${config.baseUri}/api/v1/menu/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();
        setMenus(data.menu);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingMenus(false);
      }
    };
    fetchMenus();
  }, []);

  return { Menus, loadingMenus };
};