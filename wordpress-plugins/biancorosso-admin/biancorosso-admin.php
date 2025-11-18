<?php
/**
 * Plugin Name: BiancoRosso Admin Settings
 * Description: Admin settings for BiancoRosso Headless E-commerce (Hero Image, etc.).
 * Version: 1.0.1
 * Author: Antigravity
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class BiancoRosso_Admin_Settings {

	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
		add_action( 'admin_init', array( $this, 'register_settings' ) );
		add_action( 'rest_api_init', array( $this, 'register_rest_route' ) );
		add_action( 'rest_api_init', array( $this, 'add_cors_headers' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_media_uploader' ) );
	}

	public function add_cors_headers() {
		remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
		add_filter( 'rest_pre_serve_request', function( $served, $result, $request, $server ) {
			$allowed_origins = array(
				'http://localhost:5173',
				'http://localhost:3000',
				'https://biancorossowebsite.socratisp.com'
			);
			
			$origin = isset( $_SERVER['HTTP_ORIGIN'] ) ? $_SERVER['HTTP_ORIGIN'] : '';
			
			if ( in_array( $origin, $allowed_origins ) ) {
				header( 'Access-Control-Allow-Origin: ' . $origin );
			}
			
			header( 'Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS' );
			header( 'Access-Control-Allow-Headers: Content-Type, Authorization' );
			header( 'Access-Control-Allow-Credentials: true' );
			
			return $served;
		}, 15, 4 );
	}

	public function add_admin_menu() {
		add_menu_page(
			__( 'BiancoRosso Settings', 'biancorosso' ),
			__( 'BR Settings', 'biancorosso' ),
			'manage_options',
			'biancorosso-settings',
			array( $this, 'settings_page' ),
			'dashicons-admin-settings',
			65
		);
	}

	public function register_settings() {
		register_setting( 'biancorosso_settings', 'biancorosso_hero_image', array(
			'type' => 'string',
			'sanitize_callback' => 'sanitize_text_field',
		) );
		register_setting( 'biancorosso_settings', 'biancorosso_hero_alt', array(
			'type' => 'string',
			'sanitize_callback' => 'sanitize_text_field',
			'default' => 'Jewelry Hero',
		) );
		register_setting( 'biancorosso_settings', 'biancorosso_hero_heading', array(
			'type' => 'string',
			'sanitize_callback' => 'sanitize_text_field',
			'default' => 'Timeless Elegance',
		) );
		register_setting( 'biancorosso_settings', 'biancorosso_hero_description', array(
			'type' => 'string',
			'sanitize_callback' => 'sanitize_textarea_field',
			'default' => 'Handcrafted jewelry designed to elevate your everyday style.',
		) );
	}

	public function enqueue_media_uploader( $hook ) {
		if ( 'toplevel_page_biancorosso-settings' !== $hook ) {
			return;
		}
		wp_enqueue_media();
		wp_enqueue_script(
			'biancorosso-admin-script',
			plugins_url( 'admin-script.js', __FILE__ ),
			array( 'jquery' ),
			'1.0.0',
			true
		);
	}

	public function settings_page() {
		$active_tab = isset( $_GET['tab'] ) ? sanitize_text_field( $_GET['tab'] ) : 'hero';
		
		$hero_image_id = get_option( 'biancorosso_hero_image' );
		$hero_image_url = $hero_image_id ? wp_get_attachment_url( $hero_image_id ) : '';
		$hero_alt = get_option( 'biancorosso_hero_alt', 'Jewelry Hero' );
		$hero_heading = get_option( 'biancorosso_hero_heading', 'Timeless Elegance' );
		$hero_description = get_option( 'biancorosso_hero_description', 'Handcrafted jewelry designed to elevate your everyday style.' );
		?>
		<div class="wrap">
			<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
			
			<div class="biancorosso-admin-container" style="display: flex; gap: 20px; margin-top: 20px;">
				<!-- Sidebar Navigation -->
				<div class="biancorosso-sidebar" style="flex: 0 0 200px; background: #fff; padding: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-radius: 4px;">
					<nav class="nav-tab-wrapper" style="display: flex; flex-direction: column; border: none; padding: 10px 0;">
						<a href="?page=biancorosso-settings&tab=hero" 
						   class="nav-tab <?php echo $active_tab === 'hero' ? 'nav-tab-active' : ''; ?>"
						   style="margin: 0; border: none; border-left: 3px solid <?php echo $active_tab === 'hero' ? '#2271b1' : 'transparent'; ?>; border-radius: 0; padding: 12px 20px;">
							<span class="dashicons dashicons-format-image" style="margin-right: 8px;"></span>
							<?php _e( 'Hero Section', 'biancorosso' ); ?>
						</a>
						<a href="?page=biancorosso-settings&tab=general" 
						   class="nav-tab <?php echo $active_tab === 'general' ? 'nav-tab-active' : ''; ?>"
						   style="margin: 0; border: none; border-left: 3px solid <?php echo $active_tab === 'general' ? '#2271b1' : 'transparent'; ?>; border-radius: 0; padding: 12px 20px; opacity: 0.5; cursor: not-allowed;">
							<span class="dashicons dashicons-admin-settings" style="margin-right: 8px;"></span>
							<?php _e( 'General', 'biancorosso' ); ?>
							<span style="font-size: 11px; color: #999; display: block; margin-top: 2px;">Coming Soon</span>
						</a>
						<a href="?page=biancorosso-settings&tab=seo" 
						   class="nav-tab <?php echo $active_tab === 'seo' ? 'nav-tab-active' : ''; ?>"
						   style="margin: 0; border: none; border-left: 3px solid <?php echo $active_tab === 'seo' ? '#2271b1' : 'transparent'; ?>; border-radius: 0; padding: 12px 20px; opacity: 0.5; cursor: not-allowed;">
							<span class="dashicons dashicons-search" style="margin-right: 8px;"></span>
							<?php _e( 'SEO', 'biancorosso' ); ?>
							<span style="font-size: 11px; color: #999; display: block; margin-top: 2px;">Coming Soon</span>
						</a>
						<a href="?page=biancorosso-settings&tab=advanced" 
						   class="nav-tab <?php echo $active_tab === 'advanced' ? 'nav-tab-active' : ''; ?>"
						   style="margin: 0; border: none; border-left: 3px solid <?php echo $active_tab === 'advanced' ? '#2271b1' : 'transparent'; ?>; border-radius: 0; padding: 12px 20px; opacity: 0.5; cursor: not-allowed;">
							<span class="dashicons dashicons-admin-tools" style="margin-right: 8px;"></span>
							<?php _e( 'Advanced', 'biancorosso' ); ?>
							<span style="font-size: 11px; color: #999; display: block; margin-top: 2px;">Coming Soon</span>
						</a>
					</nav>
				</div>

				<!-- Main Content Area -->
				<div class="biancorosso-content" style="flex: 1; background: #fff; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-radius: 4px;">
					<?php if ( $active_tab === 'hero' ) : ?>
						<h2 style="margin-top: 0; padding-bottom: 10px; border-bottom: 1px solid #ddd;">
							<span class="dashicons dashicons-format-image" style="color: #2271b1;"></span>
							<?php _e( 'Hero Section Settings', 'biancorosso' ); ?>
						</h2>
						<p style="color: #666; margin-bottom: 20px;">
							<?php _e( 'Customize the hero section that appears on your homepage. Upload an image and set the heading and description text.', 'biancorosso' ); ?>
						</p>

						<form method="post" action="options.php">
							<?php settings_fields( 'biancorosso_settings' ); ?>
							<?php do_settings_sections( 'biancorosso_settings' ); ?>

							<table class="form-table" role="presentation">
								<tr>
									<th scope="row">
										<label><?php _e( 'Hero Image', 'biancorosso' ); ?></label>
									</th>
									<td>
										<input type="hidden" id="biancorosso_hero_image" name="biancorosso_hero_image" value="<?php echo esc_attr( $hero_image_id ); ?>" />
										<div id="hero-image-preview" style="margin-bottom: 15px; padding: 10px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 4px; max-width: 500px;">
											<?php if ( $hero_image_url ) : ?>
												<img src="<?php echo esc_url( $hero_image_url ); ?>" style="max-width: 100%; height: auto; display: block; border-radius: 4px;" />
											<?php else: ?>
												<p style="color: #666; text-align: center; margin: 40px 0;">
													<span class="dashicons dashicons-format-image" style="font-size: 48px; opacity: 0.3;"></span><br>
													<?php _e( 'No image selected', 'biancorosso' ); ?>
												</p>
											<?php endif; ?>
										</div>
										<button type="button" class="button button-primary" id="upload-hero-image">
											<span class="dashicons dashicons-upload" style="margin-top: 3px;"></span>
											<?php _e( 'Upload Image', 'biancorosso' ); ?>
										</button>
										<?php if ( $hero_image_url ) : ?>
											<button type="button" class="button" id="remove-hero-image" style="margin-left: 8px;">
												<span class="dashicons dashicons-trash" style="margin-top: 3px;"></span>
												<?php _e( 'Remove Image', 'biancorosso' ); ?>
											</button>
										<?php endif; ?>
										<p class="description" style="margin-top: 10px;">
											<?php _e( 'Recommended size: 1920x1080px or larger for best quality.', 'biancorosso' ); ?>
										</p>
									</td>
								</tr>
								<tr>
									<th scope="row">
										<label for="biancorosso_hero_alt"><?php _e( 'Image Alt Text', 'biancorosso' ); ?></label>
									</th>
									<td>
										<input type="text" id="biancorosso_hero_alt" name="biancorosso_hero_alt" value="<?php echo esc_attr( $hero_alt ); ?>" class="regular-text" />
										<p class="description">
											<?php _e( 'Alternative text for the hero image (improves SEO and accessibility).', 'biancorosso' ); ?>
										</p>
									</td>
								</tr>
								<tr>
									<th scope="row">
										<label for="biancorosso_hero_heading"><?php _e( 'Heading Text', 'biancorosso' ); ?></label>
									</th>
									<td>
										<input type="text" id="biancorosso_hero_heading" name="biancorosso_hero_heading" value="<?php echo esc_attr( $hero_heading ); ?>" class="large-text" style="font-size: 18px; font-weight: 600;" />
										<p class="description">
											<?php _e( 'Main heading text displayed on the hero section.', 'biancorosso' ); ?>
										</p>
									</td>
								</tr>
								<tr>
									<th scope="row">
										<label for="biancorosso_hero_description"><?php _e( 'Description Text', 'biancorosso' ); ?></label>
									</th>
									<td>
										<textarea id="biancorosso_hero_description" name="biancorosso_hero_description" rows="4" class="large-text"><?php echo esc_textarea( $hero_description ); ?></textarea>
										<p class="description">
											<?php _e( 'Description text displayed below the heading. Keep it concise and engaging.', 'biancorosso' ); ?>
										</p>
									</td>
								</tr>
							</table>

							<div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
								<?php submit_button( __( 'Save Hero Settings', 'biancorosso' ), 'primary', 'submit', false ); ?>
								<p style="display: inline-block; margin-left: 10px; color: #666;">
									<span class="dashicons dashicons-info" style="margin-top: 3px;"></span>
									<?php _e( 'Changes will be reflected on your website after saving.', 'biancorosso' ); ?>
								</p>
							</div>
						</form>

					<?php elseif ( $active_tab === 'general' ) : ?>
						<h2 style="margin-top: 0;">
							<span class="dashicons dashicons-admin-settings" style="color: #2271b1;"></span>
							<?php _e( 'General Settings', 'biancorosso' ); ?>
						</h2>
						<p><?php _e( 'General settings will be available here soon.', 'biancorosso' ); ?></p>

					<?php elseif ( $active_tab === 'seo' ) : ?>
						<h2 style="margin-top: 0;">
							<span class="dashicons dashicons-search" style="color: #2271b1;"></span>
							<?php _e( 'SEO Settings', 'biancorosso' ); ?>
						</h2>
						<p><?php _e( 'SEO settings will be available here soon.', 'biancorosso' ); ?></p>

					<?php elseif ( $active_tab === 'advanced' ) : ?>
						<h2 style="margin-top: 0;">
							<span class="dashicons dashicons-admin-tools" style="color: #2271b1;"></span>
							<?php _e( 'Advanced Settings', 'biancorosso' ); ?>
						</h2>
						<p><?php _e( 'Advanced settings will be available here soon.', 'biancorosso' ); ?></p>

					<?php endif; ?>
				</div>
			</div>
		</div>

		<style>
			.biancorosso-sidebar .nav-tab {
				transition: all 0.2s ease;
			}
			.biancorosso-sidebar .nav-tab:hover:not([style*="cursor: not-allowed"]) {
				background: #f6f7f7;
				border-left-color: #2271b1 !important;
			}
			.biancorosso-sidebar .nav-tab-active {
				background: #f6f7f7;
				color: #2271b1;
				font-weight: 600;
			}
		</style>
		<?php
	}

	public function register_rest_route() {
		register_rest_route( 'biancorosso/v1', '/settings', array(
			'methods'  => 'GET',
			'callback' => array( $this, 'get_settings' ),
			'permission_callback' => '__return_true', // Public access
		) );
	}

	public function get_settings() {
		$hero_image_id = get_option( 'biancorosso_hero_image' );
		$hero_image_url = $hero_image_id ? wp_get_attachment_url( $hero_image_id ) : '';

		return array(
			'hero_image' => $hero_image_url,
			'hero_alt' => get_option( 'biancorosso_hero_alt', 'Jewelry Hero' ),
			'hero_heading' => get_option( 'biancorosso_hero_heading', 'Timeless Elegance' ),
			'hero_description' => get_option( 'biancorosso_hero_description', 'Handcrafted jewelry designed to elevate your everyday style.' ),
		);
	}
}

new BiancoRosso_Admin_Settings();
