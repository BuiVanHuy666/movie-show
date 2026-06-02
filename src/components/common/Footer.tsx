import { useTranslation } from "react-i18next";
import { PATHS } from "@/app/routes/routes.ts";

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { t } = useTranslation();

    return (
            <footer className="w-full border-t bg-background text-foreground mt-20">
                <div className="container px-4 py-12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                    <div className="flex flex-col gap-3">
                        <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-400 bg-clip-text text-transparent w-fit">
                            The MovieShow
                        </span>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {t('footer.description')}
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold mb-3 tracking-wider uppercase text-zinc-400">
                            {t('nav.movies')}
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href={PATHS.MOVIES.POPULAR} className="text-muted-foreground hover:text-foreground transition-colors">
                                    {t('menu.popular')}
                                </a>
                            </li>
                            <li>
                                <a href={PATHS.MOVIES.NOW_PLAYING} className="text-muted-foreground hover:text-foreground transition-colors">
                                    {t('menu.nowPlaying')}
                                </a>
                            </li>
                            <li>
                                <a href={PATHS.MOVIES.UP_COMING} className="text-muted-foreground hover:text-foreground transition-colors">
                                    {t('menu.upcoming')}
                                </a>
                            </li>
                            <li>
                                <a href={PATHS.MOVIES.TOP_RATED} className="text-muted-foreground hover:text-foreground transition-colors">
                                    {t('menu.topRated')}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold mb-3 tracking-wider uppercase text-zinc-400">
                            {t('nav.tvShows')}
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href={PATHS.TV.POPULAR} className="text-muted-foreground hover:text-foreground transition-colors">
                                    {t('menu.popular')}
                                </a>
                            </li>
                            <li>
                                <a href={PATHS.TV.ON_THE_AIR} className="text-muted-foreground hover:text-foreground transition-colors">
                                    {t('menu.onTheAir')}
                                </a>
                            </li>
                            <li>
                                <a href={PATHS.TV.TOP_RATED} className="text-muted-foreground hover:text-foreground transition-colors">
                                    {t('menu.topRated')}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold mb-3 tracking-wider uppercase text-zinc-400">
                            {t('footer.support')}
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                                    {t('footer.terms')}
                                </a>
                            </li>
                            <li>
                                <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                                    {t('footer.privacy')}
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                                    {t('footer.contact')}
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t py-6 border-border/40">
                    <div className="container px-4 mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-muted-foreground">
                            &copy; {currentYear} The MovieShow. {t('footer.rights')}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <a href="#" className="hover:text-foreground transition-colors">Facebook</a>
                            <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
                            <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
                        </div>
                    </div>
                </div>
            </footer>
    );
};