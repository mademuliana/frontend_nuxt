import LocationImage from '@/models/LocationImage';
import LocationLink from '@/models/LocationLink';

class Location {
  constructor( data = {} ) {
    this.id = data.id;
    this.name = data.name;
    this.country = data.country;
    this.image = new LocationImage(data.image);
    this.link = new LocationLink(data.links);
    this.slug = data.slug;
    this.tourCount = data.tourCount;
  }
  
  get imageUrl() {
    return this.image.featureImage;
  }
}
export default Location;