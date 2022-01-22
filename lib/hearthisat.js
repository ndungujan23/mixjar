const {
	api
} = require('./const');
const {
	getURL,
	getRequest,
	filterObject,
} = require('./utils');

class Pagination {

	/**
	 * Create a pagination instance for hearthisat query
	 * @param {Number} page
	 * @param {Number} count
	 * @param {Number} duration
	 */
	constructor(page = 1, count = 5, duration = null) {
		this.page = page;
		this.count = count;
		this.duration = duration;
	}
}

class FeedPagination extends Pagination {

	/**
	 * Create a feed pagination instance for hearthisat query
	 * @param {Number} page
	 * @param {Number} count
	 * @param {Number} duration
	 * @param {String} type
	 * @param {String} category
	 * @param {String} show_feed_start
	 * @param {String} show_feed_end
	 */
	constructor(page = 1, count = 5, duration = null, type = null, category = null, show_feed_start = null, show_feed_end) {
		super(page, count, duration);
		this.type = type;
		this.category = category;
		this['show-feed-start'] = show_feed_start;
		this['show-feed-end'] = show_feed_end;
	}
}

/**
 * Endpoints for hearthisat
 * @class
 */
class Hearthisat {

	/**
	 * Return a new Hearthisat instance
	 */
	constructor() {
	}

	/**
	 * Get new popular mixes from feed
	 * @param {FeedPagination} pagination
	 */
	feed_popular_new(pagination = null) {
		return getRequest(getURL('feed', api.hearthisat, filterObject({ ...pagination })));
	}

	/**
	 * Get all genres
	 * @param {Pagination} pagination
	 */
	all_genres(pagination = null) {
		return getRequest(getURL('categories', api.hearthisat, filterObject({ ...pagination })));
	}

	/**
	 * Get tracks list based on genre category
	 * @param {String} category
	 * @param {Number} page
	 * @param {Number} count
	 * @param {Number} duration
	 */
	genre_list(category, page = 1, count = 5, duration = null) {
		const qParams = filterObject({
			page,
			count,
			duration,
		});
		return getRequest(getURL(`categories/${category}`, api.hearthisat, qParams));
	}

	/**
	 * Get single artist
	 * @param {String} username
	 */
	single_artist(username) {
		return getRequest(getURL(username || '', api.hearthisat));
	}

	/**
	 * Get user tracks
	 * @param {String} username
	 * @param {('likes' | 'playlists' | 'tracks')} type
	 * @param {Number} page
	 * @param {Number} count
	 */
	artists_list(username, page = 1, count = 5, type = 'likes') {
		const qParams = filterObject({
			page,
			count,
			type,
		});
		return getRequest(getURL(username || '', api.hearthisat, qParams));
	}

	/**
	 * Get track detail
	 * @param {String} username
	 * @param {String} title
	 */
	single_track(username, title) {
		return getRequest(getURL(`${username}/${title}`, api.hearthisat));
	}

	/**
	 * Get user playlists
	 * @param {String} username
	 * @param {Number} page
	 * @param {Number} count
	 */
	single_playlist(username, page = 1, count = 5) {
		const qParams = filterObject({
			page,
			count,
			type: 'playlists'
		});
		return getRequest(getURL(username || '', api.hearthisat, qParams));
	}

	/**
	 * Search for track/user/playlist
	 * @param {('tracks'|'user'|'playlists')} type
	 * @param {String} t
	 * @param {Number} page
	 * @param {Number} count
	 * @param {Number} duration
	 */
	search(t, type = 'tracks', page = 1, count = 5, duration = null) {
		const qParams = filterObject({
			type,
			t,
			page,
			count,
			duration,
		});
		return getRequest(getURL('search', api.hearthisat, qParams));
	}
}

module.exports = Hearthisat;