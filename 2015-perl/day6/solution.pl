use strict;
use warnings;
use Switch;
use Data::Dumper;

my @aLines = ();
open(my $fh, '<', 'input.txt');
while(defined(my $sLine = <$fh>)) {
  chomp($sLine);
  push(@aLines, $sLine);
}
close($fh);

my %hBrightnessMap = ();

sub one {

  my %hMap = ();
  my $sRval = 0;

  my $sCount = 1;
  foreach my $sLine (@aLines) {
    print "Processing line $sCount\n";

    my ($sInstruction, $sStartX, $sStartY, $sEndX, $sEndY) = $sLine =~ /^(\D+) (\d+),(\d+) through (\d+),(\d+)$/;

    for(my $x = $sStartX; $x <= $sEndX; $x++) {
      for(my $y = $sStartY; $y <= $sEndY; $y++) {

        switch ($sInstruction) {
          case 'turn on' {
            $hMap{$x}{$y} = 1;
            $hBrightnessMap{$x}{$y} += 1;
          }

          case 'turn off' {
            $hMap{$x}{$y} = 0;
            $hBrightnessMap{$x}{$y} -= 1 if(defined($hBrightnessMap{$x}{$y}) && $hBrightnessMap{$x}{$y} > 0);
          }

          case 'toggle' {
            $hMap{$x}{$y} = $hMap{$x}{$y} ? 0 : 1;
            $hBrightnessMap{$x}{$y} += 2;
          }
        }
      }
    }

    $sCount++;
  }

  foreach my $x (keys %hMap) {
    foreach my $y (keys %{$hMap{$x}}) {
      $sRval++ if($hMap{$x}{$y});
    }
  }

  return $sRval;
}

sub two {
  my $sRval = 0;

  foreach my $x (keys %hBrightnessMap) {
    foreach my $y (keys %{$hBrightnessMap{$x}}) {
      $sRval += defined($hBrightnessMap{$x}{$y}) ? $hBrightnessMap{$x}{$y} : 0;
    }
  }

  return $sRval;
}

print "Solution one is: " . one() . "\n";
print "Solution two is: " . two() . "\n";
