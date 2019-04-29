﻿import TWEEN from '@tweenjs/tween.js';

export default function (e, vm) {
	let self = vm || this;
	let {
		Y,
		resolve
	} = self.$store.state;
	if (resolve) {
		self.$store.commit('change-status', {
			status: false
		});
		let {
			nth
		} = self.$route.params;
		let [oldY, newY] = [parseInt(Y), parseInt(Y)];
		if (e.deltaY == 100) {
			if (parseInt(nth) + 1 == self.$store.getters[`movieWidgetsLength`]) {
				self.$store.commit('change-status', {
					status: true
				});
				return;
			}
			newY -= 100;
		} else if (e.deltaY == -100) {
			if (parseInt(nth) == 0) {
				self.$store.commit('change-status', {
					status: true
				});
				return;
			}
			newY += 100;
		}
		if (parseInt(Math.abs(newY / -100)) <= self.$store.getters[`movieWidgetsLength`]) {
			function animate() {
				requestAnimationFrame(animate);
				TWEEN.update()
			}
			new TWEEN.Tween({
					tweeningNumber: oldY
				})
				.easing(TWEEN.Easing.Quartic.Out)
				.to({
					tweeningNumber: newY
				}, 750)
				.onUpdate(that => {
					self.$store.commit('set-y', {
						y: that.tweeningNumber.toFixed(2)
					});
				})
				.onComplete(() => {
					if (self.$store.state.Y == newY && !(self.$store.state.Y % 100)) {
						new Promise(function (resolve, reject) {
							setTimeout(function () {
								self.$router.push(`/movie/annual2018/${parseInt(Math.abs(newY / -100))}`);
								resolve();
							}, 250);
						}).then(() => {
							setTimeout(function () {
								self.$store.commit('change-status', {
									status: true
								});
							}, 150);
						})
					}
				})
				.start();
			animate();
		} else
			self.$store.commit('change-status', {
				status: true
			});
	}
}