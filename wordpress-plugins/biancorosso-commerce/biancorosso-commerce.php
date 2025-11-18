<?php
/**
 * Plugin Name: BiancoRosso Commerce
 * Description: Commerce functionality for BiancoRosso Headless E-commerce (Orders, API).
 * Version: 1.0.0
 * Author: Antigravity
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class BiancoRosso_Commerce {

	private $table_name;

	public function __construct() {
		global $wpdb;
		$this->table_name = $wpdb->prefix . 'biancorosso_orders';

		register_activation_hook( __FILE__, array( $this, 'create_orders_table' ) );
		add_action( 'rest_api_init', array( $this, 'register_api_routes' ) );
		add_action( 'rest_api_init', array( $this, 'add_cors_headers' ) );
		add_action( 'rest_api_init', array( $this, 'register_gallery_images_field' ) );
	}

	public function register_gallery_images_field() {
		register_rest_field( 'product', 'gallery_images', array(
			'get_callback' => array( $this, 'get_gallery_images' ),
			'schema'       => null,
		) );
	}

	public function get_gallery_images( $object ) {
		$gallery_ids = get_post_meta( $object['id'], '_product_image_gallery', true );
		
		if ( empty( $gallery_ids ) ) {
			return array();
		}

		$ids = explode( ',', $gallery_ids );
		$images = array();

		foreach ( $ids as $id ) {
			$url = wp_get_attachment_url( $id );
			$alt = get_post_meta( $id, '_wp_attachment_image_alt', true );
			
			if ( $url ) {
				$images[] = array(
					'src' => $url,
					'alt' => $alt,
				);
			}
		}

		return $images;
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

	public function create_orders_table() {
		global $wpdb;
		$charset_collate = $wpdb->get_charset_collate();

		$sql = "CREATE TABLE $this->table_name (
			id mediumint(9) NOT NULL AUTO_INCREMENT,
			order_date datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
			customer_name tinytext NOT NULL,
			customer_email varchar(100) NOT NULL,
			customer_address text NOT NULL,
			total_amount decimal(10,2) NOT NULL,
			items longtext NOT NULL,
			status varchar(20) DEFAULT 'pending' NOT NULL,
			PRIMARY KEY  (id)
		) $charset_collate;";

		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		dbDelta( $sql );
	}

	public function register_api_routes() {
		// Create Order Endpoint
		register_rest_route( 'biancorosso/v1', '/order', array(
			'methods'  => 'POST',
			'callback' => array( $this, 'create_order' ),
			'permission_callback' => '__return_true', // Public endpoint
		) );

		// Get Order Endpoint (for tracking)
		register_rest_route( 'biancorosso/v1', '/order/(?P<id>\d+)', array(
			'methods'  => 'GET',
			'callback' => array( $this, 'get_order' ),
			'permission_callback' => '__return_true', // Public but maybe should be protected or limited
		) );

		// Contact Form Endpoint
		register_rest_route( 'biancorosso/v1', '/contact', array(
			'methods'  => 'POST',
			'callback' => array( $this, 'handle_contact' ),
			'permission_callback' => '__return_true',
		) );
	}

	public function create_order( $request ) {
		global $wpdb;
		$params = $request->get_json_params();

		// Basic Validation
		if ( empty( $params['customer_name'] ) || empty( $params['items'] ) ) {
			return new WP_Error( 'missing_fields', 'Missing required fields', array( 'status' => 400 ) );
		}

		$data = array(
			'order_date'       => current_time( 'mysql' ),
			'customer_name'    => sanitize_text_field( $params['customer_name'] ),
			'customer_email'   => sanitize_email( $params['customer_email'] ),
			'customer_address' => sanitize_textarea_field( $params['customer_address'] ),
			'total_amount'     => floatval( $params['total_amount'] ),
			'items'            => wp_json_encode( $params['items'] ), // Store as JSON string
			'status'           => 'pending',
		);

		$format = array( '%s', '%s', '%s', '%s', '%f', '%s', '%s' );

		$wpdb->insert( $this->table_name, $data, $format );

		$order_id = $wpdb->insert_id;

		if ( $order_id ) {
			return new WP_REST_Response( array( 'success' => true, 'order_id' => $order_id ), 201 );
		} else {
			return new WP_Error( 'db_error', 'Could not save order', array( 'status' => 500 ) );
		}
	}

	public function get_order( $request ) {
		global $wpdb;
		$order_id = $request['id'];

		$order = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $this->table_name WHERE id = %d", $order_id ) );

		if ( $order ) {
			$order->items = json_decode( $order->items ); // Decode back to JSON
			return new WP_REST_Response( $order, 200 );
		} else {
			return new WP_Error( 'not_found', 'Order not found', array( 'status' => 404 ) );
		}
	}

	public function handle_contact( $request ) {
		$params = $request->get_json_params();
		
		// In a real scenario, you might send an email here
		// wp_mail( 'admin@example.com', 'New Contact', $params['message'] );

		return new WP_REST_Response( array( 'success' => true, 'message' => 'Message received' ), 200 );
	}
}

new BiancoRosso_Commerce();
