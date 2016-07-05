from tethys_sdk.base import TethysAppBase, url_map_maker


class WestVirginiaFlood(TethysAppBase):
    """
    Tethys app class for West Virginia Flood.
    """

    name = 'West Virginia Flood'
    index = 'wv_flood:home'
    icon = 'wv_flood/images/icon.gif'
    package = 'wv_flood'
    root_url = 'wv-flood'
    color = '#f1c40f'
    description = 'Place a brief description of your app here.'
    enable_feedback = False
    feedback_emails = []

        
    def url_maps(self):
        """
        Add controllers
        """
        UrlMap = url_map_maker(self.root_url)

        url_maps = (UrlMap(name='home',
                           url='wv-flood',
                           controller='wv_flood.controllers.home'),
        )

        return url_maps