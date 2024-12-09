import Image from "next/image";
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
                  <Image
              src="/bouncing-circles.svg"
              alt="Bouncing Circles"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
    </div>
  );
}