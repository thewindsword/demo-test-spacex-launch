export interface launchData {
  id: string;
  details: string|null;
  launch_date_local: string;
  mission_name: string;
  launch_site: {
    site_name_long: string;
  };
  links: {
    article_link: string;
    video_link: string;
    flickr_images: Array<string>;
  }
  rocket: {
    rocket_name: string;
    rocket_type: string;
  }
  launch_success: boolean;
}
