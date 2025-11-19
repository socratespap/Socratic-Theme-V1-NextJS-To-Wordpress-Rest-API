<?php
/**
 * Plugin Name: BiancoRosso Core
 * Description: Core functionality for BiancoRosso Headless E-commerce (CPT, Taxonomies).
 * Version: 1.0.0
 * Author: socratisp.com
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class BiancoRosso_Core {

	public function __construct() {
		add_action( 'init', array( $this, 'register_product_cpt' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action( 'rest_api_init', array( $this, 'register_rest_fields' ) );
		add_action( 'add_meta_boxes', array( $this, 'add_product_meta_boxes' ) );
		add_action( 'save_post', array( $this, 'save_product_meta' ) );
	}

	public function register_product_cpt() {
		$labels = array(
			'name'                  => _x( 'Products', 'Post Type General Name', 'biancorosso' ),
			'singular_name'         => _x( 'Product', 'Post Type Singular Name', 'biancorosso' ),
			'menu_name'             => __( 'Products', 'biancorosso' ),
			'name_admin_bar'        => __( 'Product', 'biancorosso' ),
			'archives'              => __( 'Product Archives', 'biancorosso' ),
			'attributes'            => __( 'Product Attributes', 'biancorosso' ),
			'parent_item_colon'     => __( 'Parent Product:', 'biancorosso' ),
			'all_items'             => __( 'All Products', 'biancorosso' ),
			'add_new_item'          => __( 'Add New Product', 'biancorosso' ),
			'add_new'               => __( 'Add New', 'biancorosso' ),
			'new_item'              => __( 'New Product', 'biancorosso' ),
			'edit_item'             => __( 'Edit Product', 'biancorosso' ),
			'update_item'           => __( 'Update Product', 'biancorosso' ),
			'view_item'             => __( 'View Product', 'biancorosso' ),
			'view_items'            => __( 'View Products', 'biancorosso' ),
			'search_items'          => __( 'Search Product', 'biancorosso' ),
			'not_found'             => __( 'Not found', 'biancorosso' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'biancorosso' ),
			'featured_image'        => __( 'Featured Image', 'biancorosso' ),
			'set_featured_image'    => __( 'Set featured image', 'biancorosso' ),
			'remove_featured_image' => __( 'Remove featured image', 'biancorosso' ),
			'use_featured_image'    => __( 'Use as featured image', 'biancorosso' ),
			'insert_into_item'      => __( 'Insert into product', 'biancorosso' ),
			'uploaded_to_this_item' => __( 'Uploaded to this product', 'biancorosso' ),
			'items_list'            => __( 'Products list', 'biancorosso' ),
			'items_list_navigation' => __( 'Products list navigation', 'biancorosso' ),
			'filter_items_list'     => __( 'Filter products list', 'biancorosso' ),
		);
		$args   = array(
			'label'               => __( 'Product', 'biancorosso' ),
			'description'         => __( 'Jewelry Products', 'biancorosso' ),
			'labels'              => $labels,
			'supports'            => array( 'title', 'editor', 'thumbnail', 'custom-fields', 'excerpt' ),
			'taxonomies'          => array( 'category', 'post_tag' ), // We will add custom ones too
			'hierarchical'        => false,
			'public'              => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'menu_position'       => 5,
			'menu_icon'           => 'dashicons-cart',
			'show_in_admin_bar'   => true,
			'show_in_nav_menus'   => true,
			'can_export'          => true,
			'has_archive'         => true,
			'exclude_from_search' => false,
			'publicly_queryable'  => true,
			'capability_type'     => 'post',
			'show_in_rest'        => true, // Important for Headless
		);
		register_post_type( 'product', $args );
	}

	public function register_taxonomies() {
		// Material Taxonomy
		$labels_material = array(
			'name'              => _x( 'Materials', 'taxonomy general name', 'biancorosso' ),
			'singular_name'     => _x( 'Material', 'taxonomy singular name', 'biancorosso' ),
			'search_items'      => __( 'Search Materials', 'biancorosso' ),
			'all_items'         => __( 'All Materials', 'biancorosso' ),
			'parent_item'       => __( 'Parent Material', 'biancorosso' ),
			'parent_item_colon' => __( 'Parent Material:', 'biancorosso' ),
			'edit_item'         => __( 'Edit Material', 'biancorosso' ),
			'update_item'       => __( 'Update Material', 'biancorosso' ),
			'add_new_item'      => __( 'Add New Material', 'biancorosso' ),
			'new_item_name'     => __( 'New Material Name', 'biancorosso' ),
			'menu_name'         => __( 'Material', 'biancorosso' ),
		);
		$args_material   = array(
			'hierarchical'      => true,
			'labels'            => $labels_material,
			'show_ui'           => true,
			'show_admin_column' => true,
			'query_var'         => true,
			'rewrite'           => array( 'slug' => 'material' ),
			'show_in_rest'      => true,
		);
		register_taxonomy( 'material', array( 'product' ), $args_material );

		// Collection Taxonomy
		$labels_collection = array(
			'name'              => _x( 'Collections', 'taxonomy general name', 'biancorosso' ),
			'singular_name'     => _x( 'Collection', 'taxonomy singular name', 'biancorosso' ),
			'search_items'      => __( 'Search Collections', 'biancorosso' ),
			'all_items'         => __( 'All Collections', 'biancorosso' ),
			'parent_item'       => __( 'Parent Collection', 'biancorosso' ),
			'parent_item_colon' => __( 'Parent Collection:', 'biancorosso' ),
			'edit_item'         => __( 'Edit Collection', 'biancorosso' ),
			'update_item'       => __( 'Update Collection', 'biancorosso' ),
			'add_new_item'      => __( 'Add New Collection', 'biancorosso' ),
			'new_item_name'     => __( 'New Collection Name', 'biancorosso' ),
			'menu_name'         => __( 'Collection', 'biancorosso' ),
		);
		$args_collection   = array(
			'hierarchical'      => true,
			'labels'            => $labels_collection,
			'show_ui'           => true,
			'show_admin_column' => true,
			'query_var'         => true,
			'rewrite'           => array( 'slug' => 'collection' ),
			'show_in_rest'      => true,
		);
		register_taxonomy( 'collection', array( 'product' ), $args_collection );
	}

	public function register_rest_fields() {
		// Register Price field
		register_rest_field( 'product', 'price', array(
			'get_callback' => function( $object ) {
				return get_post_meta( $object['id'], 'price', true );
			},
			'update_callback' => function( $value, $object, $field_name ) {
				return update_post_meta( $object->ID, 'price', $value );
			},
			'schema' => array(
				'description' => __( 'Product Price', 'biancorosso' ),
				'type'        => 'string',
			),
		) );

		// Register Stock field
		register_rest_field( 'product', 'stock_quantity', array(
			'get_callback' => function( $object ) {
				return get_post_meta( $object['id'], 'stock_quantity', true );
			},
			'update_callback' => function( $value, $object, $field_name ) {
				return update_post_meta( $object->ID, 'stock_quantity', $value );
			},
			'schema' => array(
				'description' => __( 'Stock Quantity', 'biancorosso' ),
				'type'        => 'integer',
			),
		) );

		// Register Image field for product_cat (WooCommerce support)
		register_rest_field( 'product_cat', 'image', array(
			'get_callback' => function( $object ) {
				$thumbnail_id = get_term_meta( $object['id'], 'thumbnail_id', true );
				if ( $thumbnail_id ) {
					return wp_get_attachment_url( $thumbnail_id );
				}
				return null;
			},
			'schema' => array(
				'description' => __( 'Category Image URL', 'biancorosso' ),
				'type'        => 'string',
			),
		) );
	}

	public function add_product_meta_boxes() {
		add_meta_box(
			'biancorosso_product_data',
			__( 'Product Data', 'biancorosso' ),
			array( $this, 'render_product_meta_box' ),
			'product',
			'normal',
			'high'
		);
	}

	public function render_product_meta_box( $post ) {
		wp_nonce_field( 'biancorosso_save_product_data', 'biancorosso_product_nonce' );
		$price = get_post_meta( $post->ID, 'price', true );
		$stock = get_post_meta( $post->ID, 'stock_quantity', true );
		?>
		<p>
			<label for="biancorosso_price"><?php _e( 'Price ($)', 'biancorosso' ); ?></label><br>
			<input type="text" id="biancorosso_price" name="price" value="<?php echo esc_attr( $price ); ?>" class="widefat">
		</p>
		<p>
			<label for="biancorosso_stock"><?php _e( 'Stock Quantity', 'biancorosso' ); ?></label><br>
			<input type="number" id="biancorosso_stock" name="stock_quantity" value="<?php echo esc_attr( $stock ); ?>" class="widefat">
		</p>
		<?php
	}

	public function save_product_meta( $post_id ) {
		if ( ! isset( $_POST['biancorosso_product_nonce'] ) ) {
			return;
		}
		if ( ! wp_verify_nonce( $_POST['biancorosso_product_nonce'], 'biancorosso_save_product_data' ) ) {
			return;
		}
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}
		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		if ( isset( $_POST['price'] ) ) {
			update_post_meta( $post_id, 'price', sanitize_text_field( $_POST['price'] ) );
		}
		if ( isset( $_POST['stock_quantity'] ) ) {
			update_post_meta( $post_id, 'stock_quantity', absint( $_POST['stock_quantity'] ) );
		}
	}
}

new BiancoRosso_Core();
