//
//  DWRefreshControl.h
//  DWRefreshManager
//
//  Created by Dowin on 2018/3/20.
//  Copyright © 2018年 Dowin. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <QuartzCore/QuartzCore.h>

@class DWRefreshControl;

typedef void(^dropReleaseBlock)(DWRefreshControl *control);

@interface DWRefreshControl : UIControl{

CAShapeLayer *_shapeLayer;
CAShapeLayer *_arrowLayer;
CAShapeLayer *_highlightLayer;
UIView *_activity;
BOOL _refreshing;
BOOL _canRefresh;
BOOL _ignoreInset;
BOOL _ignoreOffset;
BOOL _didSetInset;
BOOL _hasSectionHeaders;
CGFloat _lastOffset;
}


#ifdef __IPHONE_5_0
@property (nonatomic, strong) UIColor *tintColor UI_APPEARANCE_SELECTOR;
@property (nonatomic, assign) UIActivityIndicatorViewStyle activityIndicatorViewStyle UI_APPEARANCE_SELECTOR;
@property (nonatomic, strong) UIColor *activityIndicatorViewColor UI_APPEARANCE_SELECTOR; // iOS5 or more
#else
@property (nonatomic, strong) UIColor *tintColor;
@property (nonatomic, assign) UIActivityIndicatorViewStyle activityIndicatorViewStyle;
@property (nonatomic, strong) UIColor *activityIndicatorViewColor; // iOS5 or more
#endif
@property (assign, nonatomic) CGFloat OpenedViewHeight;
@property (copy, nonatomic) dropReleaseBlock dropRelease;
@property (nonatomic, readonly, getter=isRefreshing) BOOL refreshing;

- (id)initInScrollView:(UIScrollView *)scrollView;

// use custom activity indicator
- (id)initInScrollView:(UIScrollView *)scrollView activityIndicatorView:(UIView *)activity;

// Tells the control that a refresh operation was started programmatically
- (void)beginRefreshing;

// Tells the control the refresh operation has ended
- (void)endRefreshing;

@end
