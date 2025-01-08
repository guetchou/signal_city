import { useState } from "react";
import { Bell, BellDot, BellOff } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";

type Notification = {
  id: string;
  message: string;
  read: boolean;
  timestamp: string;
};

export function NotificationBell() {
  const [notifications, setNotifications] = useLocalStorage<Notification[]>("notifications", []);
  const [enabled, setEnabled] = useLocalStorage("notifications-enabled", true);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const toggleNotifications = () => {
    setEnabled(!enabled);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative">
          {enabled ? (
            unreadCount > 0 ? (
              <>
                <BellDot className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  {unreadCount}
                </span>
              </>
            ) : (
              <Bell className="h-5 w-5" />
            )
          ) : (
            <BellOff className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-2">
          <h3 className="font-semibold">Notifications</h3>
          <Button variant="ghost" size="sm" onClick={toggleNotifications}>
            {enabled ? <BellOff className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
          </Button>
        </div>
        {notifications.length > 0 ? (
          <>
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start">
                <span className={notification.read ? "text-gray-600" : "font-semibold"}>
                  {notification.message}
                </span>
                <span className="text-xs text-gray-500">{notification.timestamp}</span>
              </DropdownMenuItem>
            ))}
            <div className="flex justify-between p-2 border-t">
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Tout marquer comme lu
              </Button>
              <Button variant="ghost" size="sm" onClick={clearNotifications}>
                Effacer tout
              </Button>
            </div>
          </>
        ) : (
          <div className="p-4 text-center text-gray-500">
            Aucune notification
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}