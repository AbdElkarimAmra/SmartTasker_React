import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"


export function UserProfile({firstName = "Karim"}=props) {
    return (
        <div className="flex flex-col w-full pt-8 items-center">
        <Avatar>
            <AvatarFallback className="text-2xl font-semibold">{firstName[0]}</AvatarFallback>
        </Avatar>

        <h4>Hello, {firstName} </h4>

        </div>
    );
}