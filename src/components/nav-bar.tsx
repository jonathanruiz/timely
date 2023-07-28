import { siteConfig } from "../../config/site"
import { Icons } from "./icons"
import { ThemeToggle } from "./theme-toggle"
import { buttonVariants } from "./ui/button"

export function Nav() {
    return (
        <header className="sticky top-0 z-40 w-full bg-background">
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                <div className="flex gap-6 md:gap-10"></div>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-1">
                        <a
                            href={siteConfig.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div
                                className={buttonVariants({
                                    size: "sm",
                                    variant: "ghost",
                                })}
                            >
                                <Icons.gitHub className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </div>
                        </a>
                        <ThemeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}
