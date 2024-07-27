import Link from "next/link";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Footer() {
  return (
    <footer
      className="flex items-center justify-between h-16 bg-white text-black "
      style={{
        boxShadow:
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      <div className=" min-w-max flex ">
        <Link href="https://github.com/valent1neWolf">
          <img
            src="/github.svg"
            className="h-5  md:min-h-8 px-4"
            alt="GitHub"
          />
        </Link>
        <Link href="https://www.linkedin.com/in/b%C3%A1lint-farkas-73b709309/">
          <img src="/linkedin.svg" className="h-5 md:min-h-8 " alt="Linkedln" />
        </Link>
        <AlertDialog>
          <AlertDialogTrigger>
            {" "}
            <img
              alt="no database"
              src="/no-database.svg"
              className="h-5  md:hidden px-4"
            />
          </AlertDialogTrigger>
          <AlertDialogContent className="w-4/5 rounded-md">
            <AlertDialogHeader>
              <AlertDialogTitle>No Database</AlertDialogTitle>
              <AlertDialogDescription>
                Data is currently not being stored in a DB
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {/* <p>© 2024 All rights reserved</p> */}
      <p className="italic hidden md:block">
        Data is currently not being stored in a DB
      </p>
      <div>
        <img src="/images/portus.png" className="h-8" />
      </div>
    </footer>
  );
}
